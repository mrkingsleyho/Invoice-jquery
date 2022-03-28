// global variables using namespace
const app = {};
app.itemList = [];
app.total = 0;
app.taxPercent = 0;
app.tax = 0;
app.grandTotal = 0;


// click action listener for add customer button
app.addCustomerListener = function(){
$('#addCustomer').on('click', function () {
    $("#customerForm").toggle();
});
}

// click action listener for add company button
app.addCompanyListener = function(){
$('#addCompany').on('click', function () {
    $("#companyForm").toggle();
});
}

// submit action listener for saving customer data 
app.submitCustomerListener = function(){
$('#customerForm').on('submit', function (event) {
    event.preventDefault();
    $('.invoice').css("display", "block");
    $('.customerInfo').css("display", "block");
    $('#cusName').text($('#customerName').val());
    $('#cusAddress').text($('#customerAddress').val());
    if ($('#customerCity').val() !== "") {
        $('#cusCity').text($('#customerCity').val() + ",");
    }
    if ($('#customerProvince').val() !== "") {
        $('#cusProvince').text($('#customerProvince').val() + ",");
    }
    $('#cusCountry').text($('#customerCountry').val());
    $('#cusPostal').text($('#customerPostal').val());
    $('.buttonHidden').css("display", "inline-block");
    $("#customerForm")[0].reset();
    $("#customerForm").toggle();
});
}

// submit action listener for saving company data 
app.submitCompanyListener = function() {
$('#companyForm').on('submit', function (event) {
    event.preventDefault();
    $('.invoice').css("display", "block");
    $('.companyInfo').css("display", "inline-block");
    $('#comName').text($('#companyName').val());
    $('#comAddress').text($('#companyAddress').val());
    if ($('#companyCity').val() !== "") {
        $('#comCity').text($('#companyCity').val() + ",");
    }
    if ($('#companyProvince').val() !== "") {
        $('#comProvince').text($('#companyProvince').val() + ",");
    }
    $('#comCountry').text($('#companyCountry').val());
    $('#comPostal').text($('#companyPostal').val());
    if ($('#taxValue').val() !== '') {
        app.taxPercent = $('#taxValue').val() / 100;
    }
    app.calculateTotal();
    $("#companyForm")[0].reset();
    $("#companyForm").toggle();
});
}

// submit action listener for saving a product
app.submitProductListener= function() {
$('#productForm').on('submit', function (event) {
    event.preventDefault();
    $('.headings').css("display", "block");
    const iName = $('#itemName').val();
    const iPrice = parseFloat($('#price').val());
    const iQuantity = parseInt($('#quantity').val());
    const subTotal = iPrice * iQuantity;
    app.itemList.push({
        name: iName,
        price: iPrice,
        quantity: iQuantity
    });
    app.total += subTotal;
    app.calculateTotal();
    $('.invoice').css("display", "block");
    const listItem = `<li>
                <span id="name">${iName}</span>
                <span>${iQuantity}</span>
                <span>$${iPrice.toFixed(2)}</span>
                <span>$${subTotal.toFixed(2)}</span>
                <span class="remove"> &#10006;</span>
                </li>`;
    $('.invoice ul').append(listItem);
    $('#price').val('');
    $('#quantity').val('1');
    $('#itemName').val('');
});
}

// remove product action listener 
app.removeProductListener= function() {
$('.invoiceBottom ul').on("click", ".remove", function () {
    const $li = $(this).parent();
    const $nameSpan = $li.find('#name');
    const name = $nameSpan.text();
    const index = app.itemList.findIndex(i => i.name === name);
    const subTotal = app.itemList[index].price * app.itemList[index].quantity;
    app.total -= subTotal;
    app.calculateTotal();
    app.itemList.splice(index, 1);
    $li.remove();
    if (app.itemList.length === 0) {
        $('.hidden').css("display", "none");
        $('.headings').css("display", "none");
    }
});
}

// print action listener
app.printListener= function() {
    $('#print').on('click', function () {
    let page = $("body").html();
    let toPrint = $("#invoice").html();
    $("body").html(toPrint);
    window.print();
    $("body").html(page);
});
}

// a function to calculate the subtotal, tax and grand total
app.calculateTotal= function() {
    $('.hidden').css("display", "block");
    $('.buttonHidden').css("display", "inline-block");
    $('#total').text(`$${app.total.toFixed(2)}`);
    app.tax = parseFloat(app.total * app.taxPercent);
    $('#tax').text(`$${app.tax.toFixed(2)}`);
    app.grandTotal = app.total + app.tax;
    $('#grandTotal').text(`$${app.grandTotal.toFixed(2)}`);
}

//load countries
app.loadCountries=function() {
    const countries = ['', 'Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', `Cote D'ivoire`, 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'Kuwait', 'Kyrgyzstan', `Lao People's Democratic Republic`, 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and The Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and The South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']; 
    $('#customerCountry').empty();
    $('#companyCountry').empty();
    for (let i=0; i<countries.length; i++) {
        const option = `<option value="${countries[i]}">${countries[i]}</option>`;
        $('#customerCountry').append(option);
        $('#companyCountry').append(option);
    }
  
}

// init methid
app.init = function () {
    const date = new Date();
    formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    $('#date').text(formattedDate);
    app.loadCountries();
    app.addCustomerListener();
    app.addCompanyListener();
    app.submitCustomerListener();
    app.submitCompanyListener();
    app.submitProductListener();
    app.removeProductListener();
    app.printListener();
}

// document.ready 
$(function () {
    app.init();
}
);


