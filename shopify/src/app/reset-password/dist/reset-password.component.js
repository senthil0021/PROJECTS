"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(fb, authService, snackBar, route, router) {
        this.fb = fb;
        this.authService = authService;
        this.snackBar = snackBar;
        this.route = route;
        this.router = router;
        this.token = null;
        this.resetPasswordForm = this.fb.group({
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get the token from the query parameters
        this.route.queryParams.subscribe(function (params) {
            _this.token = params['token'];
            if (!_this.token) {
                _this.snackBar.open('Invalid or expired token', 'Close', { duration: 3000 });
                _this.router.navigate(['/forgot-password']);
            }
        });
    };
    ResetPasswordComponent.prototype.onResetPasswordSubmit = function () {
        var _this = this;
        if (this.resetPasswordForm.valid && this.token) {
            var password = this.resetPasswordForm.value.password;
            this.authService.resetPassword(this.token, { password: password }).subscribe(function () {
                _this.snackBar.open('Password reset successful', 'Close', { duration: 3000 });
                _this.router.navigate(['/login']);
            }, function (error) {
                console.error('Failed to reset password', error);
                var errorMessage = 'Failed to reset password. Please try again later.';
                if (error.error && error.error.error) {
                    errorMessage = error.error.error;
                }
                _this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
            });
        }
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            standalone: true,
            imports: [forms_1.ReactiveFormsModule, common_1.NgIf],
            templateUrl: './reset-password.component.html',
            styleUrl: './reset-password.component.css'
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
