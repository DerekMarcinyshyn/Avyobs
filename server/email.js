sendEmail = function(to, subject, text, html) {

    // TODO: limit who can send emails

    var from = 'no-reply@monasheemountainmultimedia.com';
    var siteName = 'Avy Observations';
    var subject = '[' + siteName + ']' + subject;

    console.log('...sending email...');
    console.log('from: ' + from);
    console.log('to: ' + to);
    console.log('subject: ' + subject);
    console.log('text: ' + text);
    console.log('html: ' + html);

    Email.send({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    });
};