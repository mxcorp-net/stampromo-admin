import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Family} from '../_models/family';
import {environment} from '../../environments/environment';
import {CoreService} from './core.service';
import {FamilyAttribute} from '../_models/family.attribute';

@Injectable({
    providedIn: 'root'
})
export class FamiliesService implements CoreService {

    constructor(private http: HttpClient) {
    }

    where(query: {}): Observable<Family[]> {
        return this.http.post<Family[]>(environment.api + '/families/where', query);
    }

    saveFamily(family: Family): Observable<Family> {
        return family.id > 0 ? this.update(family) : this.add(family);
    }

    saveAttribute(attribute: FamilyAttribute): Observable<FamilyAttribute> {
        return attribute.id > 0 ? this.updateAttribute(attribute) : this.addAttribute(attribute);
    }

    // TODO: check permissions
    add(newFamily: Family): Observable<Family> {
        return this.http.post<Family>(environment.api + '/families/new', newFamily);
    }

    getAttributes(familyId: number): Observable<FamilyAttribute[]> {
        return this.http.get<FamilyAttribute[]>(environment.api + '/families/' + familyId + '/attributes');
    }

    // TODO: check permissions
    addAttribute(newAttribute: FamilyAttribute): Observable<FamilyAttribute> {
        return this.http.post<FamilyAttribute>(environment.api + '/families/attributes/new', newAttribute);
    }

    // TODO: check permissions
    delete(query: {}): Observable<any> {
        return undefined;
    }

    find(query: {}): Observable<any> {
        return undefined;
    }

    // TODO: check permissions
    update(family: Family): Observable<Family> {
        return this.http.put<Family>(environment.api + '/families/update', family);
    }

    updateAttribute(attribute: FamilyAttribute): Observable<FamilyAttribute> {
        return this.http.put<FamilyAttribute>(environment.api + '/families/attributes/update', attribute);
    }
}
