import {Injectable, Inject, LOCALE_ID} from '@angular/core';
import {ProjectService} from './backendApi/project.service';
import {filter, distinctUntilChanged} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {IProject, IVehicle} from '@stibs/api';
import {DOCUMENT} from '@angular/common';

const CUSTOM_VALUES = 'CUSTOM_VALUES';
const SELECTED_PROJECT = 'SELECTED_PROJECT';
const SELECTED_VEHICLE = 'SELECTED_VEHICLE';

export const DEFAULT_PAGE_SIZE = 5;

export interface CustomSettings {
  timeout: {
    duration: number;
    show: boolean;
  },
  dashboard: {
    project: boolean;
    vehicle: boolean;
  },
  menu: {
    display: 'large' | 'small';
  },
  theme: {
    dark: boolean;
  },
  lastActivity: {
    projectId: number,
    vehicleId: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _projects: IProject[];
  private _vehicles: IVehicle[];

  private _currentMeta = new BehaviorSubject<any>(undefined);
  private _currentProject = new BehaviorSubject<IProject>(undefined);
  private _currentVehicle = new BehaviorSubject<IVehicle>(undefined);
  private _currentSettings = new BehaviorSubject<any>(undefined);

  private defaultSettings: CustomSettings = {
    timeout: {
      duration: 60,
      show: true
    },
    dashboard: {
      project: true,
      vehicle: true
    },
    menu: {
      display: 'large'
    },
    theme: {
      dark: false
    },
    lastActivity: {
      projectId: undefined,
      vehicleId: undefined
    }
  };

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(LOCALE_ID) private locale: string, private projectService: ProjectService) {

    this.onCurrentSettings().subscribe(() => {
      if (this.darkTheme) {
        this.document.body.classList.add('stadler-dark');
      } else {
        this.document.body.classList.remove('stadler-dark');
      }
    });

    const savedSettings = localStorage.getItem(CUSTOM_VALUES);
    if (savedSettings) {
      this.currentSettings = JSON.parse(savedSettings);
    } else {
      this.currentSettings = this.defaultSettings;
    }
  }

  get selectedProject(): number {
    return Number(localStorage.getItem(SELECTED_PROJECT)) || undefined;
  }


  get currentProject(): IProject {
    return this._currentProject.value;
  }

  set currentProject(project: IProject) {
    if (project) {
      localStorage.setItem(SELECTED_PROJECT, String(project.id));
    } else {
      localStorage.removeItem(SELECTED_PROJECT);
    }

    this._currentProject.next(project);

  }

  onCurrentProjectChange(): Observable<IProject> {
    return this._currentProject.asObservable().pipe(
      distinctUntilChanged((x, y) => x && y ? x.id === y.id : x === y)
    );
  }

  get selectedVehicle(): number {
    return Number(localStorage.getItem(SELECTED_VEHICLE)) || undefined;
  }

  get currentVehicle(): IVehicle {
    return this._currentVehicle.value;
  }

  set currentVehicle(vehicle: IVehicle) {

    if (vehicle) {
      localStorage.setItem(SELECTED_VEHICLE, String(vehicle.id));
    } else {
      localStorage.removeItem(SELECTED_VEHICLE);
    }
    this._currentVehicle.next(vehicle);

  }

  onCurrentVehicleChange(): Observable<IVehicle> {
    return this._currentVehicle.asObservable().pipe(
      distinctUntilChanged((x, y) => x && y ? x.id === y.id : x === y)
    );
  }

  get currentMeta(): any {
    return this._currentMeta.value;
  }

  set currentMeta(meta: any) {
    this._currentMeta.next(meta);
  }

  onCurrentMetaChange(): Observable<any> {
    return this._currentMeta.pipe(
      filter((v) => !!v)
    );
  }

  get currentSettings(): CustomSettings {
    return this._currentSettings.value;
  }

  set currentSettings(settings: CustomSettings) {
    localStorage.setItem(CUSTOM_VALUES, JSON.stringify(settings));
    this._currentSettings.next(settings);
  }

  onCurrentSettings(): Observable<CustomSettings> {
    return this._currentSettings.pipe(
      filter((v) => !!v)
    );
  }

  /*
  *   Global getters
  */
  public async projects(): Promise<IProject[]> {

    if (!this._projects) {
      this._projects = await this.projectService.getProjectAllList().toPromise();
    }

    if (!this.currentProject) {
      if (this.selectedProject) {
        this.currentProject = this._projects.find((p) => p.id === this.selectedProject) || this._projects[0];
      } else {
        this.currentProject = this._projects[0];
      }
    }

    return this._projects;

  }

  public async vehicles(projectId: number): Promise<IVehicle[]> {

    if (!this._vehicles || this.selectedProject !== projectId) {
      this._vehicles = await this.projectService.getProjectAllVehicleList(projectId).toPromise();
    }

    if (!this.currentVehicle) {
      if (this.selectedVehicle) {
        this.currentVehicle = this._vehicles.find((v) => v.id === this.selectedVehicle) || this._vehicles[0];
      } else {
        this.currentVehicle = this._vehicles[0];
      }
    } else {
      // this.currentVehicle = this._vehicles[0];
    }

    return this._vehicles;

  }

  /*
  *   Some common getters
  */
  get darkTheme(): boolean {
    return this.currentSettings && this.currentSettings.theme && this.currentSettings.theme.dark;
  }

  get showIdle(): boolean {
    return this.currentSettings && this.currentSettings.timeout && this.currentSettings.timeout.show;
  }

  get currentLocale(): string {
    return this.locale;
  }

}
