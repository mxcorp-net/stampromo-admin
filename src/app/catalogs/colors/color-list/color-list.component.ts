import {Component, OnInit} from '@angular/core';
import {DatatableColumn, DatatableSettings, DatatableSource} from '../../../_components/datatable/datatable.component';

@Component({
    selector: 'app-color-list',
    templateUrl: './color-list.component.html',
    styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {
    dataSource: DatatableSource = <DatatableSource>{
        Limit: 50,
        Columns: [
            <DatatableColumn>{name: 'Id'},
            <DatatableColumn>{name: 'Name'},
            <DatatableColumn>{name: 'Hex'}
        ]
    };
    dataSettings: DatatableSettings = <DatatableSettings>{
        ActiveSearch: true
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    editColor($event: any) {

    }

    newColor($event: any) {

    }
}
