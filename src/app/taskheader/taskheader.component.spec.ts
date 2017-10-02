import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskheaderComponent } from './taskheader.component';

describe('TaskheaderComponent', () => {
  let component: TaskheaderComponent;
  let fixture: ComponentFixture<TaskheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
