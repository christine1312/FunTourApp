import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAttractionPage } from './add-attraction.page';

describe('AddAttractionPage', () => {
  let component: AddAttractionPage;
  let fixture: ComponentFixture<AddAttractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttractionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAttractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
