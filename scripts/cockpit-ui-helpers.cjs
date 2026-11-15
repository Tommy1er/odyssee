// Follow the same native disclosure as a user; never bypass visibility for observation settings.
async function openObservationTools(page){
 const panel=page.locator('#observatory-controls');
 if(!await panel.evaluate(el=>el.open))await panel.locator('summary').click();
}
module.exports={openObservationTools};
