import {Component, OnInit} from '@angular/core';
import {DatatableColumn, DatatableSettings, DatatableSource} from '../../../_components/datatable/datatable.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FamiliesService} from '../../../../services/families.service';

@Component({
    selector: 'app-family-list',
    templateUrl: './family-list.component.html',
    styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
    dataSource: DatatableSource = <DatatableSource>{
        Limit: 50,
        Columns: [
            <DatatableColumn>{name: 'Id'},
            <DatatableColumn>{name: 'Name'},
            <DatatableColumn>{name: 'Description'}
        ]
    };
    dataSettings: DatatableSettings = <DatatableSettings>{
        ActiveSearch: true
    };
    private familyService: FamiliesService;

    constructor(
        private router: Router,
        private http: HttpClient,
        private modalService: BsModalService
    ) {
        this.dataSource.Service = this.familyService = new FamiliesService(http);
    }

    ngOnInit(): void {
    }

    editProduct($event: any) {

    }

    newProduct($event: any) {

    }
}
