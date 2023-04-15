import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Tag} from '../../../_models/tag';
import {HttpClient} from '@angular/common/http';
import {TagsService} from '../../../services/tags.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../@pages/components/message/message.service';

@Component({
    selector: 'app-tag-edit-modal',
    templateUrl: './tag-edit-modal.component.html',
    styleUrls: ['./tag-edit-modal.component.scss']
})
export class TagEditModalComponent implements OnInit {

    tag: Tag = new Tag();
    title: string;
    tagServices: TagsService;
    form: any;
    errorForm: any;
    onSuccess: EventEmitter<any> = new EventEmitter();

    constructor(
        public modalRef: BsModalRef,
        private http: HttpClient,
        private _notification: MessageService) {
        this.tagServices = new TagsService(http);
    }

    ngOnInit() {
        this.title = this.tag.id > 0 ? 'Edit Tag' : 'New Tag';
    }

    validateForm() {
        return new FormGroup({
            name: new FormControl(this.tag.word, [
                Validators.required
            ])
        });
    }

    updateTag(tag: Tag) {
        this.form = this.validateForm();
        if (this.form.status === 'VALID') {
            this.tagServices.update(tag);
            this.errorForm = false;
        } else {
            this.errorForm = true;
        }
        // console.log(this.form.status)
        //
    }

    createTag(event: MouseEvent) {
        this.form = this.validateForm();
        if (this.form.status === 'VALID') {
            this.tagServices.add(this.tag).subscribe(
                data => {
                    // TODO close modal and update table
                    this._notification.create(
                        'primary',
                        'New Tag ' + this.tag.word + ' Added',
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

    deleteTag(id: number) {

    }
}
