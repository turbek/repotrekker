import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {By} from "@angular/platform-browser";
import {SearchInputComponent} from "../search-input/search-input.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

describe('NavbarComponent: IT', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule],
            declarations: [NavbarComponent, SearchInputComponent],
            providers: [
                HttpClient,
                HttpHandler,
                Location
            ]
        });

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should show the searchbar if the width is more than 500px', () => {
        const spyOnInputShown = spyOn(component, 'isSearchInputShown').and.returnValue(true);
        const spyOnIconShown = spyOn(component, 'isSearchIconShown').and.returnValue(false);
        component.isSearchInputShown();
        component.isSearchIconShown();
        fixture.detectChanges();

        let icon = fixture.debugElement.query(By.css('.fa-search'));
        let searchComponent = fixture.debugElement.query(By.directive(SearchInputComponent));

        expect(spyOnIconShown).toHaveBeenCalled();
        expect(spyOnInputShown).toHaveBeenCalled();
        expect(icon).toBeFalsy();
        expect(searchComponent).toBeTruthy();
    });

    it('should show the search icon if the width is less than 500px', () => {
        const spyOnInputShown = spyOn(component, 'isSearchInputShown').and.returnValue(false);
        const spyOnIconShown = spyOn(component, 'isSearchIconShown').and.returnValue(true);
        component.isSearchInputShown();
        component.isSearchIconShown();
        fixture.detectChanges();

        let icon = fixture.debugElement.query(By.css('.fa-search'));
        let searchComponent = fixture.debugElement.query(By.directive(SearchInputComponent));

        expect(spyOnIconShown).toHaveBeenCalled();
        expect(spyOnInputShown).toHaveBeenCalled();
        expect(icon).toBeTruthy();
        expect(searchComponent).toBeFalsy();
    });

    it('should show the searchbar if the width is less than 500px and the user clicks on the search icon', () => {
        const spyOnInputShown = spyOn(component, 'isSearchInputShown').and.returnValue(false);
        const spyOnIconShown = spyOn(component, 'isSearchIconShown').and.returnValue(true);
        component.isSearchInputShown();
        component.isSearchIconShown();
        fixture.detectChanges();

        let icon = fixture.debugElement.query(By.css('.fa-search'));
        icon.triggerEventHandler('click', null);
        fixture.detectChanges();
        let searchComponent = fixture.debugElement.query(By.directive(SearchInputComponent));

        expect(spyOnIconShown).toHaveBeenCalled();
        expect(spyOnInputShown).toHaveBeenCalled();
        expect(icon).toBeTruthy();
        expect(searchComponent).toBeTruthy();
    });
});
