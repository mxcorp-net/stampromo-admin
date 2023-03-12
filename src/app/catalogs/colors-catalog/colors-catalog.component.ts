import {Component, OnInit, TemplateRef} from '@angular/core';
import {DatatableColumn, DatatableSettings, DatatableSource} from "../../_components/datatable/datatable.component";
import {HttpClient} from "@angular/common/http";
import {ColorsService} from "../../services/colors.service";
import {MessageService} from '../../@pages/components/message/message.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Color} from "../../_models/color";
import {ColorsEditModalComponent} from "./colors-edit-modal/colors-edit-modal.component";

@Component({
    selector: 'app-colors-catalog',
    templateUrl: './colors-catalog.component.html',
    styleUrls: ['./colors-catalog.component.scss']
})
export class ColorsCatalogComponent implements OnInit {

    // dataSource: DatatableSource = new DatatableSource();
    dataSource: DatatableSource = <DatatableSource>{
        Limit: 50,
        Columns: [
            <DatatableColumn>{name: 'Id'},
            <DatatableColumn>{name: 'Name'},
            <DatatableColumn>{name: 'Hex'},
        ]
    };
    dataSettings: DatatableSettings = <DatatableSettings>{
        ActiveSearch: true
    };

    modalRef: BsModalRef;
    constructor(private http: HttpClient, private _notification: MessageService
    ,private modalService: BsModalService) {
        this.dataSource.Service = new ColorsService(http);
    }

    ngOnInit() {

    }

    createAlert() {
        this._notification.create(
            "primary",
            "Hello World",
            {
                Position: "top",
                Style: "bar",
                Duration: 0,
                Title: 'test',
                imgURL: 'test'
            }
        );
    }

    editColor(event: Color) {
        const initialState = {
            color: event,
        };
        this.modalRef = this.modalService.show(ColorsEditModalComponent, {
            initialState
        });
    }

    newColor(event: any) {
        this.modalRef = this.modalService.show(ColorsEditModalComponent);
    }
}
