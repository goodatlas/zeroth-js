class TranscriptCache {
  constructor() {
    this.cache = [];
    this.result = '';
  }

  add(data) {
    if (!data) return;
    const { transcript } = data;
    let text = '';

    if (data.final) {
      if (!this.cache.includes(transcript)) {
        this.cache.push(transcript);
        text = this.cache
          .map(
            m =>
              m.charAt(0) +
              m
                .slice(1)
                .toLowerCase()
                .concat('.')
          )
          .join(' ');
        this.result = text;
        console.log({
          result: this.result,
          cache: this.cache,
          final: true
        });
        return this.result;
      }
    } else {
      text = this.cache
        .map(
          m =>
            m.charAt(0) +
            m
              .slice(1)
              .toLowerCase()
              .concat('.')
        )
        .join(' ')
        .concat(transcript);
      this.result = text;
      console.log({
        result: this.result,
        cache: this.cache,
        final: false
      });
      return this.result;
    }
  }

  clean() {
    this.cache = [];
    this.result = '';
  }
}

export default TranscriptCache;
