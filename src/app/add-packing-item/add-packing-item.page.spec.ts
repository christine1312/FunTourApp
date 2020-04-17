import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPackingItemPage } from './add-packing-item.page';

describe('AddPackingItemPage', () => {
  let component: AddPackingItemPage;
  let fixture: ComponentFixture<AddPackingItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackingItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPackingItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
