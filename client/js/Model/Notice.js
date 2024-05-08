export class Notice {

    static validatePhone(phone) {
        // Basic validation for Vietnamese phone numbers
        const phoneRegex = /^(0[1-9])+([0-9]{8,9})\b$/;
        return phoneRegex.test(phone);
    }

    static validateEmail(email) {
        // Basic email validation
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return emailRegex.test(email);
    }

    static setupMessage() {
        $('.message').hide();
        $('.message i').click(function() { $(".message").hide() })
    }
}
Notice.setupMessage();