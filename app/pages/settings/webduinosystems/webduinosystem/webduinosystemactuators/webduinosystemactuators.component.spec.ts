import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebduinosystemactuatorsComponent } from './webduinosystemactuators.component';

describe('WebduinosystemactuatorsComponent', () => {
  let component: WebduinosystemactuatorsComponent;
  let fixture: ComponentFixture<WebduinosystemactuatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebduinosystemactuatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebduinosystemactuatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
