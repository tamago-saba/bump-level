export class BumpTracker {
    lastBump: number | undefined;

    recordBump() {
        this.lastBump = Date.now();
    }
}
