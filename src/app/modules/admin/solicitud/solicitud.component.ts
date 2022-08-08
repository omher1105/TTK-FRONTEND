import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseNavigationService} from '../../../../@fuse/components/navigation';
import {NavigationService} from '../../../core/navigation/navigation.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';

  title: string;

  unsubscribe = new Subject();

  /**
   * Constructor
   */
  constructor(
      private _activatedRoute: ActivatedRoute,
      private _changeDetectorRef: ChangeDetectorRef,
      private _router: Router,
      private _fuseNavigationService: FuseNavigationService,
      private _navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
  }

  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['./'], {relativeTo: this._activatedRoute});

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

}
