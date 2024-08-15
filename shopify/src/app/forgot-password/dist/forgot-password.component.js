"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ForgotPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var rxjs_2 = require("rxjs");
var common_1 = require("@angular/common");
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(fb, authService, snackBar, router) {
        this.fb = fb;
        this.authService = authService;
        this.snackBar = snackBar;
        this.router = router;
        this.forgotPasswordForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
    }
    ForgotPasswordComponent.prototype.onForgotPasswordSubmit = function () {
        var _this = this;
        if (this.forgotPasswordForm.valid) {
            this.authService.forgotPassword(this.forgotPasswordForm.value).pipe(rxjs_1.catchError(function (error) {
                console.error('Failed to send password reset link', error);
                var errorMessage = 'Failed to send password reset link. Please try again later.';
                if (error.error && error.error.error) {
                    errorMessage = error.error.error;
                }
                _this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
                return rxjs_2.of(null);
            })).subscribe(function (response) {
                if (response) {
                    _this.snackBar.open('Password reset link sent', 'Close', { duration: 3000 });
                    // Navigate to reset password page
                    // You can modify this part if the actual URL requires parameters
                    _this.router.navigate(['/reset-password']);
                }
            });
        }
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-forgot-password',
            standalone: true,
            imports: [forms_1.ReactiveFormsModule, common_1.NgIf],
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.css']
        })
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
