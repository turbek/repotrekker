import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueHolderComponent } from './issue-holder.component';

describe('IssueHolderComponent', () => {
  let component: IssueHolderComponent;
  let fixture: ComponentFixture<IssueHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
