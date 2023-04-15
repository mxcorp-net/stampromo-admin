import {Component, EventEmitter, OnInit} from '@angular/core';
import {Family} from '../../../_models/family';
import {BsModalRef} from 'ngx-bootstrap';
import {FamiliesService} from '../../../services/families.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FamilyAttribute} from '../../../_models/family.attribute';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-families-edit-modal',
    templateUrl: './families-edit-modal.component.html',
    styleUrls: ['./families-edit-modal.component.scss']
})
export class FamiliesEditModalComponent implements OnInit {
    family: Family = new Family();
    title: string;
    familyGroup: FormGroup;
    familiesService: FamiliesService;
    attributeTypes = [
        {value: 'Text', label: ''},
        {value: 'Number', label: ''},
        {value: 'Date', label: ''},
        {value: 'File', label: ''},
        {value: 'Image', label: '', disabled: true}
    ];
    // TODO: create new events for emitt objects and control by parent
    onSaveFamily: EventEmitter<Family> = new EventEmitter();

    constructor(
        public modalRef: BsModalRef,
        private fb: FormBuilder,
        private http: HttpClient
    ) {
        this.familiesService = new FamiliesService(http);
        this.familyGroup = this.fb.group({
            familyName: ['', [Validators.required]],
            familyDescription: ['', [Validators.required]],
            familyAttributes: this.fb.array([])
        });
    }

    ngOnInit() {
        if (this.family.id > 0) {
            this.title = 'Edit Family';
            this.familyGroup.controls['familyName'].setValue(this.family.name);
            this.familyGroup.controls['familyDescription'].setValue(this.family.description);
            this.familiesService.getAttributes(this.family.id).subscribe(
                data => {
                    this.family.attributes = data;
                    for (const attribute of this.family.attributes) {
                        this.addAttribute(attribute.id, attribute.name, attribute.type);
                    }
                }
            );
        } else {
            this.title = 'New Family';
        }

    }

    getFormControl(name) {
        return this.familyGroup.controls[name];
    }


    deleteFamily(id: number): void {
        alert('Trigger Delete');
    }

    addAttribute(id: number, name: string, type: string): void {
        const builder = this.fb.group({
            familyAttribute: [name, [Validators.required]],
            familyAttributeId: [id, [Validators.required]],
            familyAttributeType: [type, [Validators.required]]
        });
        this.familyGroup.get('familyAttributes')['controls'].push(builder);
    }

    saveFamily(familyGroup: FormGroup): void {
        this.family.name = this.familyGroup.controls['familyName'].value;
        this.family.description = this.familyGroup.controls['familyDescription'].value;
        this.family.attributes = [];

        for (const attGroup of this.familyGroup.get('familyAttributes')['controls']) {
            let attribute: FamilyAttribute;
            attribute = new FamilyAttribute();

            attribute.family_id = this.family.id;
            attribute.id = attGroup.controls['familyAttributeId'].value;
            attribute.name = attGroup.controls['familyAttribute'].value;
            attribute.type = attGroup.controls['familyAttributeType'].value;

            this.family.attributes.push(attribute);
        }

        this.onSaveFamily.next(this.family);
    }
}
