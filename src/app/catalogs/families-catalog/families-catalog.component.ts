import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableColumn, DatatableComponent, DatatableSettings, DatatableSource} from '../../_components/datatable/datatable.component';
import {FamiliesService} from '../../services/families.service';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FamiliesEditModalComponent} from './families-edit-modal/families-edit-modal.component';
import {Family} from '../../_models/family';
import {take} from 'rxjs/operators';
import {MessageService} from '../../@pages/components/message/message.service';

@Component({
    selector: 'app-families-catalog',
    templateUrl: './families-catalog.component.html',
    styleUrls: ['./families-catalog.component.scss']
})
export class FamiliesCatalogComponent implements OnInit {
    @ViewChild('FamiliesDataTable', {static: false}) dataTable: DatatableComponent;

    familiesService: FamiliesService;
    dataSource: DatatableSource = <DatatableSource>{
        Limit: 50,
        Columns: [
            <DatatableColumn>{name: 'Name'},
            <DatatableColumn>{name: 'Description'},
            <DatatableColumn>{name: 'ProductsCount', label: 'Products'}
        ]
    };
    dataSettings: DatatableSettings = <DatatableSettings>{
        ActiveSearch: true
    };
    private modalRef: BsModalRef;

    constructor(
        private http: HttpClient,
        private modalService: BsModalService,
        private _notification: MessageService
    ) {
        this.familiesService = new FamiliesService(http);
        this.dataSource.Service = this.familiesService;
    }

    ngOnInit() {

    }

    editFamily(event: Family) {
        const initialState = {
            family: event
        };
        this.modalRef = this.modalService.show(FamiliesEditModalComponent, {
            class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true, initialState
        });
        this.saveFamilyEvent();
    }

    newFamily(event: any) {
        this.modalRef = this.modalService.show(FamiliesEditModalComponent, {
            class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
        });
        this.saveFamilyEvent();
    }

    private saveFamilyEvent() {
        this.modalRef.content.onSaveFamily.pipe(take(1)).subscribe(family => {
            this.dataTable.isLoading = true;
            this.familiesService.saveFamily(family).subscribe(
                dataFamily => {
                    this._notification.success(
                        'Family ' + family.name + ' was saved successfully',
                        {
                            Position: 'top',
                            Style: 'bar',
                            Duration: 10000
                        }
                    );
                    family.id = dataFamily.id;

                    for (const attribute of family.attributes) {
                        attribute.family_id = family.id;
                        this.familiesService.saveAttribute(attribute).subscribe(
                            dataAttribute => {
                                this._notification.success(
                                    'Attribute ' + dataAttribute.name + ' was saved successfully',
                                    {
                                        Position: 'top',
                                        Style: 'bar',
                                        Duration: 10000
                                    }
                                );
                            }, error => {
                                this.dataTable.errorMessage = error;
                                this.dataTable.showMessage = true;
                            }
                        );
                    }
                },
                error => {
                    this.dataTable.errorMessage = error;
                    this.dataTable.showMessage = true;
                    this.modalRef.hide();
                },
                () => {
                    this.modalRef.hide();
                }
            );
            this.successFamilyEvent();
        });
    }

    private successFamilyEvent() {
        this.dataTable.searchValue = '';
        this.dataTable.reloadTable();
    }
}
