import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAttractionPage } from './edit-attraction.page';

describe('EditAttractionPage', () => {
  let component: EditAttractionPage;
  let fixture: ComponentFixture<EditAttractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAttractionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAttractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
