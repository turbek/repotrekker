import {RepositoryComponent} from "./repository.component";

describe('RepositoryComponent: UNIT', () => {
    let component: RepositoryComponent;

    beforeEach(() => {
        component = new RepositoryComponent();
        component.sliceDescriptionAt = 5;
    });

    it('#isDescriptionTooLong should return true if the description is too long', () => {
        component.description = "123456";

        let isLong = component.isDescriptionTooLong();

        expect(isLong).toBeTruthy();
    });
    it('#isDescriptionTooLong should return false if the description fits', () => {
        component.description = "1234";

        let isLong = component.isDescriptionTooLong();

        expect(isLong).toBeFalsy();
    });
    it('#isDescriptionTooLong should return false if the description is null', () => {
        component.description = null;

        let isLong = component.isDescriptionTooLong();

        expect(isLong).toBeFalsy();
    });
});
