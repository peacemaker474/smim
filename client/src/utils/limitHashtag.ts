export default function limitHashtag(hashtag: Array<string>) {
  const length = [0, 0];
  for (let i = 0; i < hashtag.length; i += 1) {
    length[0] += hashtag[i].length;
    length[1] += 1;
    if (length[0] > 10) {
      break;
    } else if (length[1] > 4) {
      break;
    } else if (hashtag.length === 0) {
      break;
    }
  }

  const limitLength = length[1];

  const hashtagEdition = hashtag.slice(0, limitLength);

  return hashtagEdition;
}
