import express, {Request, Response} from 'express';

const router = express.Router();

//Testing route for service name get request

// Testing route for service name  get request with error
router.get('/add-service-name-error', (req, res) => {
  let errorMessages: Map<String, String> = new Map<String, String>();
  errorMessages.set('serviceName', 'Enter your service name');
  res.render("add-service-name.njk",{ errorMessages: errorMessages });
});

// Testing route for client details dashboard
router.get('/client-details', (req, res) => {
  res.render("service-dashboard-client-details.njk", {
      publicKeyAndUrlsNotUpdatedByUser: true,
      userDetailsUpdated: false,
      clientName: "My juggling service",
      serviceName: "My juggling service",
      clientId: "X8rnOEw0SqOdEAOnWyPQ6YsJugQ",
      redirectUrls: "https://get-a-juggling-licence.gov.uk/redirect/endpoint",
      userAttributesRequired: "Email address<br>Phone number",
      userPublicKey: "Not yet added",
      postLogoutRedirectUrls: "Not yet added"
  });
});

// Testing route for client details dashboard update view
router.get('/service-dashboard-client-details-update', (req, res) => {
  res.render("service-dashboard-client-details-update.njk");
});

// Testing route for client details dashboard update view with errors
router.get('/service-dashboard-client-details-update-error', (req, res) => {
  let errorMessages: Map<String, String> = new Map<String, String>();
  errorMessages.set('clientNameDetails', 'Enter a client name');
  errorMessages.set('redirectUrl', 'Enter a redirect URI');
  res.render("service-dashboard-client-details-update.njk",{ errors: errorMessages });
});

// Testing routes for Change your client name page
router.get('/change-client-name', (req, res) => {
    res.render("dashboard/change-client-name.njk", {
        value: 'My juggling service'
    });
});

router.post('/change-client-name', (req, res) => {
    let clientName = req.body.clientName;
    if (clientName === "") {
        const errorMessages = new Map<string, string>();
        errorMessages.set('clientName', 'Enter your client name');
        res.render('dashboard/change-client-name.njk', {errorMessages: errorMessages});
        return;
    }
    res.redirect('/service-dashboard-client-details');
});


export default router;
