import { Component, OnInit } from '@angular/core';
import {DatatableColumn, DatatableSettings, DatatableSource} from '../../_components/datatable/datatable.component';
import {HttpClient} from '@angular/common/http';
import {TagsService} from '../../services/tags.service';
import {Tag} from '../../_models/tag';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TagEditModalComponent} from './tag-edit-modal/tag-edit-modal.component';

@Component({
  selector: 'app-tags-catalog',
  templateUrl: './tags-catalog.component.html',
  styleUrls: ['./tags-catalog.component.scss']
})
export class TagsCatalogComponent implements OnInit {

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
  }
}
