import { TimestampOptions } from "../../lib/interfaces/TimestampOptions";

export class Timestamp {
  start: number;
  end: number;

  constructor(options: TimestampOptions) {
    this.start = options.start ?? 0;
    this.end = options.end ?? 0;
  }
}
