import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTravelerPage } from './add-traveler.page';

describe('AddTravelerPage', () => {
  let component: AddTravelerPage;
  let fixture: ComponentFixture<AddTravelerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTravelerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTravelerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
