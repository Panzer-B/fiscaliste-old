import {TestBed} from '@angular/core/testing';

import {CalculatorService} from './calculator.service';
import {MockStore} from "@ngrx/store/testing";

describe('CalculatorService', () => {
    let store: MockStore<any>;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        const service: CalculatorService = TestBed.get(CalculatorService);
        expect(service).toBeTruthy();
    });
});
