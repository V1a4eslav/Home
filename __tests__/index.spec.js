describe('On HTML', function () {
    beforeAll(() => {
        document.body.innerHTML = `<h1>Gallery</h1>`;
    });

    it('should not change header', function () {
        expect(document.querySelector('h1').textContent).toBe('Gallery');
    });

    // it('should change header', function () {
    //     require('../src/scripts/app');
    //
    //     expect(document.querySelector('h1').textContent).toBe('Header was changed!');
    // });

    // it('should change image', function () {
    //     require('../src/scripts/listeners.js');
    //
    //     document.querySelector('.pages').click();
    //
    //     expect(document.querySelector('.page').textContent).toBe(document.querySelector('.page').textContent);
    // });
});