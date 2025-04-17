const mailBtn = document.querySelector('#mail-btn');
if (!mailBtn) {
  throw new Error('Mail button not found');
}

mailBtn.addEventListener('click', () => {
  const prefix = 'kontakt';
  const suffix = 'nilsleifeld';
  const ending = '.de';
  const split = '@';
  const text = prefix + split + suffix + ending;
  navigator.clipboard.writeText(text).then(() => {
    const span = mailBtn.querySelector('span');
    if (!span) {
      throw new Error('Span in mail button not found');
    }
    span.innerText = 'Copied';
    setTimeout(() => (span.innerText = 'Mail'), 1500);
  });
});
