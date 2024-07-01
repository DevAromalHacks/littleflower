import { FormData } from '../app/components/forms/ComplaintForm';

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email/complaint-email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}