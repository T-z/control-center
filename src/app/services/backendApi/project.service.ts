import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_PREFIX, IListResponse, IProject, IProjectVersion, isListResponse, IVehicle } from '@stibs/api';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  /**
   * Ajax
   */

  getProjectAllList(): Observable<IProject[]> {
    return this.http.get<IListResponse<IProject>>(`/${API_PREFIX}/project`).pipe(
      map((response) => {

        if (!isListResponse(response)) {
          throw new Error('Error');
        }

        return response[0];

      })
    );
  }

  deleteProjectVersion(projectVersion_id: number) {
    return this.http.delete(`/${API_PREFIX}/project/version/${projectVersion_id}`, { responseType: 'text' });
  }

  getProjectVersionList(projectId: number, offset: number = 0, limit: number = 5): Observable<IListResponse<IProjectVersion>> {
    const params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));
    return this.http.get<IListResponse<IProjectVersion>>(`/${API_PREFIX}/project/version/${projectId}`, { params });
  }

  getProjectVehicleList(projectId: number, offset: number = 0, limit: number = 5): Observable<IListResponse<IVehicle>> {
    const params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));
    return this.http.get<IListResponse<IVehicle>>(`/${API_PREFIX}/vehicle/${projectId}`, { params });
  }

  getProjectAllVehicleList(projectId: number): Observable<IVehicle[]> {
    return this.http.get<IListResponse<IVehicle>>(`/${API_PREFIX}/vehicle/${projectId}`).pipe(
      map((response) => {
        return response[0];
      })
    );
  }

  addVehicle(param: IVehicle) {
    return this.http.post<IVehicle>(`/${API_PREFIX}/vehicle`, param);
  }

  deleteVehicle(vehicleId: number) {
    return this.http.delete(`/${API_PREFIX}/vehicle/${vehicleId}`, { responseType: 'text' });
  }

  importProject(param) {
    return this.http.post(`/${API_PREFIX}/project/import`, param, { responseType: 'text' });
  }

  getJobRequest(offset: number = 0, limit: number = 5): Observable<IListResponse<any>> {
    const params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));
    return this.http.get<IListResponse<any>>(`/${API_PREFIX}/project/jobs`, { params }).pipe(
      map((response) => {

        if (!isListResponse(response)) {
          throw new Error('Error');
        }

        return response;

      })
    );
  }

  deleteJobRequest(jobId: number): Observable<void> {
    return this.http.delete(`/${API_PREFIX}/project/job/${jobId}`, { responseType: 'text' }).pipe(map(() => {
    }));
  }

  activateProjectVersion(id: string | number) {
    return this.http.get(`/${API_PREFIX}/project/version/${id}/activate`, { responseType: 'text' });
  }

  deactivateProjectVersion(id: string | number) {
    return this.http.get(`/${API_PREFIX}/project/version/${id}/deactivate`, { responseType: 'text' });
  }

  archiveProject(param: IProject) {
    return this.http.post<IProject>(`/${API_PREFIX}/project/${param.id}/archive`, param);
  }

  getProjectStatistikSummary(projectId: number): Observable<any> {
    return this.http.get<any>(`/${API_PREFIX}/statistics/project/${projectId}/summary`);
  }

  getProjectStatistik(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`/${API_PREFIX}/statistics/project/${projectId}`);
  }

  getVehicleStatistik(vehicleId: number): Observable<any> {
    return this.http.get(`/${API_PREFIX}/statistics/vehicle/${vehicleId}`);
  }

  getProtocolStatistik(vehicleId: number): Observable<any> {
    return this.http.get(`/${API_PREFIX}/statistics/vehicle/${vehicleId}/summary`);
  }

  getReportList(vehicle_id: number, offset: number = 0, limit: number = 5, userFilter?: any, userSort?: any): Observable<IListResponse<any>> {

    const params = this.getParams(userFilter, userSort, offset, limit);

    return this.http.get(`/${API_PREFIX}/report/${vehicle_id}`, { params }).pipe(
      map((response) => {

        if (!isListResponse(response)) {
          throw new Error('Error');
        }

        return response;

      })
    );

  }

  setVehicleProcessingDate(vehicleId: number, startDate: string, endDate: string): Observable<any> {
    const params = {
      start: new Date(startDate),
      end: new Date(endDate)
    };
    return this.http.post<IVehicle>(`/${API_PREFIX}/vehicle/${vehicleId}/processing`, params);
  }

  lockVehicleStatistik(vehicleId: number): Observable<any> {
    return this.http.get(`/${API_PREFIX}/vehicle/${vehicleId}/lock`, { responseType: 'text' });
  }

  unlockVehicleStatistik(vehicleId: number): Observable<any> {
    return this.http.get(`/${API_PREFIX}/vehicle/${vehicleId}/unlock`, { responseType: 'text' });
  }

  archiveDownload(vehicleId: number) {
    return `/${API_PREFIX}/report/get/archive/${vehicleId}`;
  }

  reportDownload(vehicleId: number, projectInstructionId: number, type: 'document' | 'instruction', final: boolean = false) {

    if (type === 'document') {
      return this.documentDownloadUrl(vehicleId, projectInstructionId, final);
    } else if (type === 'instruction') {
      return this.instructionDownloadUrl(vehicleId, projectInstructionId);
    }

  }

  private documentDownloadUrl(vehicleId: number, projectInstructionId: number, final: boolean): string {
    const params = new HttpParams().set('final', String(final));
    return `/${API_PREFIX}/report/get/document/${vehicleId}/${projectInstructionId}?${params}`;
  }

  private instructionDownloadUrl(vehicleId: number, projectInstructionId: number): string {
    return `/${API_PREFIX}/report/get/instruction/${vehicleId}/${projectInstructionId}`;
  }

  createReport(vehicleId: number, projectInstructionId: number, data: { comment: string, password: string }, final: boolean): Observable<void> {

    const params = {
      comment: data.comment,
      password: final ? data.password : undefined,
      final
    };

    return this.http.post(`/${API_PREFIX}/report/create/document/${vehicleId}/${projectInstructionId}`, params, { responseType: 'text' }).pipe(map(() => { }));

  }

  createInstruction(vehicleId: number, projectInstructionId: number): Observable<void> {
    return this.http.post(`/${API_PREFIX}/report/create/instruction/${vehicleId}/${projectInstructionId}`, undefined, { responseType: 'text' }).pipe(map(() => { }));
  }

}
