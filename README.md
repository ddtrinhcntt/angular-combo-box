# angular-combo-box
Lightweight Angular JS directive which combines a select element with a text input.

[![Build Status](https://travis-ci.org/bradleytrager/angular-combo-box.svg)](https://travis-ci.org/bradleytrager/angular-combo-box)

[Demo](http://bradleytrager.github.io/angular-combo-box/)

##Install

####Manual download 
Download latest release from [here](https://github.com/bradleytrager/angular-combo-box/releases)

####Bower
```sh
bower install angular-combo-box
```

##Usage
```html
<combo-box
	label="--Select--" //The default option if nothing is chosen
    options="options" //An array of predefined options
    combo-model="comboModel" //The bound value of the combo box
    other-label="An option not on the list..." //Optional label for other input
></combo-box>
```
```JavaScript
//Include 'ngComboBox as a module dependency
angular.module('ngComboBoxExample', ['ngComboBox'])
    .controller('myController', function ($scope) {
    $scope.options = [
        //List of predefined options    
    ];
    //The bound value of the combo box
    $scope.comboModel = '';
});
```