describe('angular combo box', function() {
    var $scope, $compile, $timeout;

    beforeEach(function() {

        module('ngComboBox');

        inject(function(_$compile_, $rootScope, _$timeout_) {
            $scope = $rootScope;
            $compile = _$compile_;
            $timeout = _$timeout_;
        });

    });

    describe('basic functionality', function() {
        it('does not set a value initially', function() {
            $scope.comboModel = '';
            var elem = compileDirective();
            expect(elem.find('select').val()).toBe('');
            expect($scope.comboModel).toBe('');
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
        });

        it('sets the value for a given option and hides other input', function() {
            $scope.comboModel = 'one';
            var elem = compileDirective();
            expect(elem.find('select').val()).toBe('one');
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
        });

        it('sets the value for another option and shows other input', function() {
            $scope.comboModel = 'something else';
            var elem = compileDirective();
            expect(elem.find('select').val()).toBe('other');
            expect(elem.find('input').val()).toBe('something else');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
        });

        it('sets an alternative value', function() {
            $scope.comboModel = 'one';
            var elem = compileDirective();
            elem.find('select').val('other').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
            elem.find('input').val('something else').triggerHandler('change');
            expect($scope.comboModel).toBe('something else');
        });

        it('sets a given option', function() {
            $scope.comboModel = 'something else';
            var elem = compileDirective();
            elem.find('select').val('one').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
            expect($scope.comboModel).toBe('one');
        });

        it('focuses on the other input when the other option is chosen', function() {
            $scope.comboModel = '';
            var elem = compileDirective();
            document.body.appendChild(elem[0]);
            elem.find('select').val('other').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
            var input = elem.find('input');
            $timeout.flush();
            expect(document.activeElement).toBe(input[0]);
            elem.remove();
        });
    });

    describe('passing a custom value for "other"', function() {
        it('uses "Other" by default', function() {
            var elem = compileDirective();
            var options = elem.find('option');
            var otherLabel = options[options.length - 1].innerHTML;
            expect(otherLabel).toBe('Other');
        });

        it('sets a custom value if provided', function() {
            var elem = compileDirective(angular.element('<combo-box ' +
                'options="options" ' +
                'combo-model="comboModel"' +
                'other-label="Something Else"></combo-box>'));
            var options = elem.find('option');
            var otherLabel = options[options.length - 1].innerHTML;
            expect(otherLabel).toBe('Something Else');
        });
    });

    describe('passing a custom value for the label', function() {
        it('uses "Other" by default', function() {
            var elem = compileDirective(angular.element('<combo-box ' +
                'label="my custom label"' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>'));
            var options = elem.find('option');
            var otherLabel = options[0].innerHTML;
            expect(otherLabel).toBe('my custom label');
        });
    });



    function compileDirective(elem) {
        if (!elem) {
            elem = angular.element('<combo-box ' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>');
        }
        $scope.options = ["one", "two", "three"];

        $compile(elem)($scope);
        $scope.$digest();
        return elem;
    }


});
