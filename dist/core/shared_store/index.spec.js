"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("lodash");
var index_1 = require("./index");
var component_1 = require("../../tests/component");
// Complex store actions.
var ADD_ITEM = 'add_item';
var REMOVE_ITEM = 'remove_item';
var ComplexStore = (function (_super) {
    __extends(ComplexStore, _super);
    function ComplexStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComplexStore.prototype.initialState = function () {
        return [];
    };
    ComplexStore.prototype.reduce = function (state, action) {
        switch (action.type) {
            case ADD_ITEM: return _.union(state, [action.item]);
            case REMOVE_ITEM: return _.without(state, action.item);
            default: fail(action.type + " handling not implemented");
        }
    };
    return ComplexStore;
}(index_1.SharedStore));
component_1.describeComponent('shared store', [
    component_1.useSharedStore('complex', ComplexStore),
], function (tester) {
    // Ensure we have a shared store manager for each test.
    var sharedStoreManager;
    beforeEach(inject(function (_sharedStoreManager_) {
        sharedStoreManager = _sharedStoreManager_;
    }));
    it('dispatches to complex stores', function () {
        var subscriber = jasmine.createSpy('subscriber');
        var store = sharedStoreManager.getStore('complex');
        expect(store).toBeDefined();
        store.observable().subscribe(subscriber);
        expect(subscriber).toHaveBeenCalledTimes(1);
        store.dispatch({ type: ADD_ITEM, item: 'hello' });
        store.dispatch({ type: ADD_ITEM, item: 'world' });
        store.dispatch({ type: ADD_ITEM, item: 'hello' });
        expect(store.value()).toEqual(['hello', 'world']);
        expect(subscriber).toHaveBeenCalledTimes(3);
        store.dispatch({ type: REMOVE_ITEM, item: 'hello' });
        store.dispatch({ type: REMOVE_ITEM, item: 'hello' });
        store.dispatch({ type: REMOVE_ITEM, item: 'hello' });
        expect(store.value()).toEqual(['world']);
        expect(subscriber).toHaveBeenCalledTimes(4);
        sharedStoreManager.dispatch({ type: REMOVE_ITEM, item: 'world' });
        sharedStoreManager.dispatch({ type: ADD_ITEM, item: 'global' });
        sharedStoreManager.dispatch({ type: ADD_ITEM, item: 'dispatch' });
        expect(store.value()).toEqual(['global', 'dispatch']);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlL3NoYXJlZF9zdG9yZS9pbmRleC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBCQUE0QjtBQUU1QixpQ0FBd0Q7QUFDeEQsbURBQXdFO0FBRXZFLHlCQUF5QjtBQUMxQixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBRWxDO0lBQTJCLGdDQUEwQjtJQUFyRDs7SUFZQSxDQUFDO0lBWGEsbUNBQVksR0FBdEI7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVTLDZCQUFNLEdBQWhCLFVBQWlCLEtBQWUsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUssUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BELEtBQUssV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsU0FBUyxJQUFJLENBQUksTUFBTSxDQUFDLElBQUksOEJBQTJCLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FaQSxBQVlDLENBWjBCLG1CQUFXLEdBWXJDO0FBRUQsNkJBQWlCLENBQUMsY0FBYyxFQUFFO0lBQzlCLDBCQUFjLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztDQUMxQyxFQUFFLFVBQUMsTUFBTTtJQUNOLHVEQUF1RDtJQUN2RCxJQUFJLGtCQUFzQyxDQUFDO0lBQzNDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxvQkFBb0I7UUFDbkMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUMvQixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRW5ELElBQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDaEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDaEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFFaEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNoRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQzlELGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiY29yZS9zaGFyZWRfc3RvcmUvaW5kZXguc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtTaGFyZWRTdG9yZU1hbmFnZXIsIFNoYXJlZFN0b3JlfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7ZGVzY3JpYmVDb21wb25lbnQsIHVzZVNoYXJlZFN0b3JlfSBmcm9tICcuLi8uLi90ZXN0cy9jb21wb25lbnQnO1xuXG4gLy8gQ29tcGxleCBzdG9yZSBhY3Rpb25zLlxuY29uc3QgQUREX0lURU0gPSAnYWRkX2l0ZW0nO1xuY29uc3QgUkVNT1ZFX0lURU0gPSAncmVtb3ZlX2l0ZW0nO1xuXG5jbGFzcyBDb21wbGV4U3RvcmUgZXh0ZW5kcyBTaGFyZWRTdG9yZTxzdHJpbmdbXSwgYW55PiB7XG4gICAgcHJvdGVjdGVkIGluaXRpYWxTdGF0ZSgpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVkdWNlKHN0YXRlOiBzdHJpbmdbXSwgYWN0aW9uOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQUREX0lURU06IHJldHVybiBfLnVuaW9uKHN0YXRlLCBbYWN0aW9uLml0ZW1dKTtcbiAgICAgICAgICAgIGNhc2UgUkVNT1ZFX0lURU06IHJldHVybiBfLndpdGhvdXQoc3RhdGUsIGFjdGlvbi5pdGVtKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhaWwoYCR7YWN0aW9uLnR5cGV9IGhhbmRsaW5nIG5vdCBpbXBsZW1lbnRlZGApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5kZXNjcmliZUNvbXBvbmVudCgnc2hhcmVkIHN0b3JlJywgW1xuICAgIHVzZVNoYXJlZFN0b3JlKCdjb21wbGV4JywgQ29tcGxleFN0b3JlKSxcbl0sICh0ZXN0ZXIpID0+IHtcbiAgICAvLyBFbnN1cmUgd2UgaGF2ZSBhIHNoYXJlZCBzdG9yZSBtYW5hZ2VyIGZvciBlYWNoIHRlc3QuXG4gICAgbGV0IHNoYXJlZFN0b3JlTWFuYWdlcjogU2hhcmVkU3RvcmVNYW5hZ2VyO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfc2hhcmVkU3RvcmVNYW5hZ2VyXykgPT4ge1xuICAgICAgICBzaGFyZWRTdG9yZU1hbmFnZXIgPSBfc2hhcmVkU3RvcmVNYW5hZ2VyXztcbiAgICB9KSk7XG5cbiAgICBpdCgnZGlzcGF0Y2hlcyB0byBjb21wbGV4IHN0b3JlcycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IGphc21pbmUuY3JlYXRlU3B5KCdzdWJzY3JpYmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmUgPSBzaGFyZWRTdG9yZU1hbmFnZXIuZ2V0U3RvcmUoJ2NvbXBsZXgnKTtcbiAgICAgICAgZXhwZWN0KHN0b3JlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBzdG9yZS5vYnNlcnZhYmxlKCkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICBleHBlY3Qoc3Vic2NyaWJlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOiBBRERfSVRFTSwgaXRlbTogJ2hlbGxvJ30pO1xuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogQUREX0lURU0sIGl0ZW06ICd3b3JsZCd9KTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6IEFERF9JVEVNLCBpdGVtOiAnaGVsbG8nfSk7XG5cbiAgICAgICAgZXhwZWN0KHN0b3JlLnZhbHVlKCkpLnRvRXF1YWwoWydoZWxsbycsICd3b3JsZCddKTtcbiAgICAgICAgZXhwZWN0KHN1YnNjcmliZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygzKTtcblxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogUkVNT1ZFX0lURU0sIGl0ZW06ICdoZWxsbyd9KTtcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6IFJFTU9WRV9JVEVNLCBpdGVtOiAnaGVsbG8nfSk7XG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOiBSRU1PVkVfSVRFTSwgaXRlbTogJ2hlbGxvJ30pO1xuXG4gICAgICAgIGV4cGVjdChzdG9yZS52YWx1ZSgpKS50b0VxdWFsKFsnd29ybGQnXSk7XG4gICAgICAgIGV4cGVjdChzdWJzY3JpYmVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNCk7XG5cbiAgICAgICAgc2hhcmVkU3RvcmVNYW5hZ2VyLmRpc3BhdGNoKHt0eXBlOiBSRU1PVkVfSVRFTSwgaXRlbTogJ3dvcmxkJ30pO1xuICAgICAgICBzaGFyZWRTdG9yZU1hbmFnZXIuZGlzcGF0Y2goe3R5cGU6IEFERF9JVEVNLCBpdGVtOiAnZ2xvYmFsJ30pO1xuICAgICAgICBzaGFyZWRTdG9yZU1hbmFnZXIuZGlzcGF0Y2goe3R5cGU6IEFERF9JVEVNLCBpdGVtOiAnZGlzcGF0Y2gnfSk7XG5cbiAgICAgICAgZXhwZWN0KHN0b3JlLnZhbHVlKCkpLnRvRXF1YWwoWydnbG9iYWwnLCAnZGlzcGF0Y2gnXSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
