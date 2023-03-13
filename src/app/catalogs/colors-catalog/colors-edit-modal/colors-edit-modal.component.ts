import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Color} from '../../../_models/color';
import {HttpClient} from '@angular/common/http';
import {ColorsService} from '../../../services/colors.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../@pages/components/message/message.service';

@Component({
    selector: 'app-colors-edit-modal',
    templateUrl: './colors-edit-modal.component.html',
    styleUrls: ['./colors-edit-modal.component.scss']
})
export class ColorsEditModalComponent implements OnInit {
    color: Color = new Color();
    title: string;
    colorServices: any;
    form: any;
    errorForm = false;

    constructor(public modalRef: BsModalRef, private http: HttpClient,
                private _notification: MessageService) {
        this.colorServices = new ColorsService(http);
    }

    ngOnInit() {
        this.title = this.color.id > 0 ? 'Edit Color' : 'New Color';
    }

    updateColor(color: Color) {
        this.form = this.validateForm();
        if (this.form.status === 'VALID') {
            this.colorServices.update(color);
            this.errorForm = false;
        } else {
            this.errorForm = true;
        }
        // console.log(this.form.status)
        //
    }

    createColor(event: MouseEvent) {
        this.form = this.validateForm();
        if (this.form.status === 'VALID') {
            this.colorServices.add(this.color).subscribe(
                data => {
                    // TODO close modal and update table
                    this._notification.create(
                        'primary',
                        'New Color ' + this.color.name + ' Added',
                        { // TODO give style to error notification
                            Position: 'top',
                            Style: 'bar',
                            Duration: 10000
                        }
                    );
                }, error => {
                    // TODO send second notification
                    this.modalRef.hide();
                }, () => this.modalRef.hide()
            );
            this.errorForm = false;
        } else {
            this.errorForm = true;
        }
    }

    validateForm() {
        return new FormGroup({
            name: new FormControl(this.color.name, [
                Validators.required
            ]),
            hex: new FormControl(this.color.hex, [
                Validators.required
            ])
        });
    }

}
