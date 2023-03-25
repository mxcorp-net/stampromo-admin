import {Component, EventEmitter, OnInit} from '@angular/core';
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
    colorServices: ColorsService;
    form: FormGroup;
    errorForm = false;
    onSuccess: EventEmitter<any> = new EventEmitter();

    constructor(public modalRef: BsModalRef,
                private http: HttpClient,
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
    }

    createColor(event: MouseEvent) {
        this.form = this.validateForm();
        if (this.form.status === 'VALID') {
            this.colorServices.add(this.color).subscribe(
                data => {
                    this._notification.create(
                        'primary',
                        'New Color ' + this.color.name + ' Added',
                        { // TODO give style to error notification
                            Position: 'top',
                            Style: 'bar',
                            Duration: 10000
                        }
                    );
                    this.onSuccess.next(true);
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
