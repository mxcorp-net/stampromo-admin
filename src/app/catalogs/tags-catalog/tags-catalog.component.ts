import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableColumn, DatatableComponent, DatatableSettings, DatatableSource} from '../../_components/datatable/datatable.component';
import {HttpClient} from '@angular/common/http';
import {TagsService} from '../../services/tags.service';
import {Tag} from '../../_models/tag';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TagEditModalComponent} from './tag-edit-modal/tag-edit-modal.component';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-tags-catalog',
    templateUrl: './tags-catalog.component.html',
    styleUrls: ['./tags-catalog.component.scss']
})
export class TagsCatalogComponent implements OnInit {
    @ViewChild('TagsDataTable', {static: false}) dataTable: DatatableComponent;

    // dataSource: DatatableSource = new DatatableSource();
    dataSource: DatatableSource = <DatatableSource>{
        Limit: 50,
        Columns: [
            <DatatableColumn>{name: 'Id'},
            <DatatableColumn>{name: 'Word'}
        ]
    };
    dataSettings: DatatableSettings = <DatatableSettings>{
        ActiveSearch: true
    };

    modalRef: BsModalRef;

    constructor(private http: HttpClient, private modalService: BsModalService) {
        this.dataSource.Service = new TagsService(http);
    }

    ngOnInit() {
    }

    editTag(event: Tag) {
        const initialState = {
            tag: event,
        };
        this.modalRef = this.modalService.show(TagEditModalComponent, {
            initialState
        });
    }

    newTag(event: any) {
        this.modalRef = this.modalService.show(TagEditModalComponent);
        this.modalRef.content.onSuccess.pipe(take(1)).subscribe(value => {
            if (value) {
                this.dataTable.searchValue = '';
                this.dataTable.reloadTable();
            }
        });
    }
}
