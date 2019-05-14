import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepositoryComponent} from './repository.component';
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

describe('RepositoryComponent: IT', () => {
    let component: RepositoryComponent;
    let fixture: ComponentFixture<RepositoryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [RepositoryComponent]
        });
        fixture = TestBed.createComponent(RepositoryComponent);
        component = fixture.componentInstance;
    });

    it('should only render one paragraph with a description', () => {
        longDescriptionAndDetectChanges();

        let debugElements = fixture.debugElement.queryAll(By.css('.cursor-pointer'));

        expect(debugElements.length).toBe(1);
    });


    it('should render partial description if it\'s too long', () => {
        longDescriptionAndDetectChanges();

        let debugElement = fixture.debugElement.query(By.css('.card-text'));
        let htmlElement: HTMLElement = debugElement.nativeElement;

        expect(component.partialDescription).toBeTruthy();
        expect(htmlElement.innerText).toContain('...');
    });

    it('should add a pointer styled cursor when description is too long', () => {
        longDescriptionAndDetectChanges();

        let debugElement = fixture.debugElement.query(By.css('.card-text'));

        expect(debugElement.classes['cursor-pointer']).toBeTruthy();
    });


    it('should render full description if it\'s NOT too long', () => {
        shortDescriptionAndDetectChanges();

        let debugElement = fixture.debugElement.query(By.css('.card-text'));
        let htmlElement: HTMLElement = debugElement.nativeElement;

        expect(htmlElement.innerText).not.toContain('...');
    });

    function longDescriptionAndDetectChanges() {
        component.sliceDescriptionAt = 5;
        component.description = "123456";
        fixture.detectChanges();
    }

    function shortDescriptionAndDetectChanges() {
        component.sliceDescriptionAt = 7;
        component.description = "123456";
        fixture.detectChanges();
    }
});
