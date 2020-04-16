import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchByCityPage } from './search-by-city.page';

describe('SearchByCityPage', () => {
  let component: SearchByCityPage;
  let fixture: ComponentFixture<SearchByCityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByCityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchByCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
