/* Shared song + chord data */

export const songs = [
  { title: "Horse With No Name", artist: "America", difficulty: "Easy", chords: ["Em", "D6add9/F#"], pattern: "D D D D", tips: "Let open strings ring; keep right hand relaxed.", progress: 4 },
  { title: "Knockin' on Heaven's Door", artist: "Bob Dylan", difficulty: "Easy", chords: ["G", "D", "Am", "C"], pattern: "D D U U D U", tips: "Let chords ring naturally; keep tempo steady.", progress: 2 },
  { title: "Wonderwall", artist: "Oasis", difficulty: "Easy", chords: ["Em7", "G", "Dsus4", "A7"], pattern: "D D U U D U", tips: "Loose wrist, relaxed upstrokes.", progress: 3 },
  { title: "Hotel California", artist: "Eagles", difficulty: "Intermediate", chords: ["Bm", "F#", "A", "E", "G", "D", "Em"], pattern: "D D U U D U", tips: "Focus on smooth chord transitions.", progress: 1 },
  { title: "Blackbird", artist: "The Beatles", difficulty: "Advanced", chords: ["G", "A", "C", "D", "Em"], pattern: "Fingerpicked", tips: "Focus on alternating bass notes.", progress: 1 },
  { title: "Loch Lomond", artist: "Traditional", difficulty: "Easy", chords: ["G", "D", "Em", "C"], pattern: "D D U U D U", tips: "Keep the rhythm steady and sing the melody over the chords.", progress: 0 },
  { title: "Fix You", artist: "Coldplay", difficulty: "Easy", chords: ["C", "Em", "Am", "G", "F"], pattern: "D D U U D U", tips: "Start gently and build dynamics; use open strings where possible.", progress: 0 },
  { title: "Wonderful Tonight", artist: "Eric Clapton", difficulty: "Easy", chords: ["G", "D", "C", "Em"], pattern: "D D U U D U", tips: "Slow, relaxed strumming; focus on timing and feel.", progress: 0 },
  { title: "Brown Eyed Girl", artist: "Van Morrison", difficulty: "Easy", chords: ["G", "C", "D", "Em"], pattern: "D D U U D U", tips: "Keep the groove light and bouncy.", progress: 0 },
  { title: "Stand By Me", artist: "Ben E. King", difficulty: "Easy", chords: ["G", "Em", "C", "D"], pattern: "D D U U D U", tips: "Simple steady strum; emphasize the bass.", progress: 0 },
  { title: "Tears In Heaven", artist: "Eric Clapton", difficulty: "Intermediate", chords: ["A", "E", "F#m", "D"], pattern: "Fingerpicked", tips: "Work slowly on the fingerpicking pattern.", progress: 0 },
  { title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", difficulty: "Intermediate", chords: ["D", "C", "G"], pattern: "D D U U D U", tips: "Palm mute slightly for the groove.", progress: 0 },
  { title: "Let It Be", artist: "The Beatles", difficulty: "Easy", chords: ["C", "G", "Am", "F"], pattern: "D D U U D U", tips: "Keep chord changes smooth and sing the melody.", progress: 0 },
  { title: "Hallelujah", artist: "Leonard Cohen", difficulty: "Intermediate", chords: ["C", "Am", "F", "G", "Em"], pattern: "Fingerpicked", tips: "Slow, expressive playing; focus on tone.", progress: 0 },
  { title: "Wonder", artist: "Shawn Mendes", difficulty: "Intermediate", chords: ["C", "G", "Am", "F"], pattern: "D D U U D U", tips: "Use dynamics to build the chorus.", progress: 0 },
  { title: "Yellow", artist: "Coldplay", difficulty: "Easy", chords: ["C", "G", "Am", "F"], pattern: "D D U U D U", tips: "Simple strum with steady tempo.", progress: 0 },
  { title: "Riptide", artist: "Vance Joy", difficulty: "Easy", chords: ["Am", "G", "C"], pattern: "D D U U D U", tips: "Upbeat rhythm; keep the right hand loose.", progress: 0 },
  { title: "Creep", artist: "Radiohead", difficulty: "Easy", chords: ["G", "B", "C", "Cm"], pattern: "D D U U D U", tips: "Powerful dynamics on the chorus.", progress: 0 },
  { title: "Redemption Song", artist: "Bob Marley", difficulty: "Intermediate", chords: ["G", "Em", "C", "D"], pattern: "Fingerpicked", tips: "Work on steady thumb bass.", progress: 0 },
  { title: "No Woman No Cry", artist: "Bob Marley", difficulty: "Easy", chords: ["C", "G", "Am", "F"], pattern: "D D U U D U", tips: "Keep the groove relaxed.", progress: 0 }
];

export const chords = {
  "C":  { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  "D":  { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  "E":  { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  "G":  { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  "Em": { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  "A7": { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
  "Dsus4": { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4] },
  "Em7": { frets: [0, 2, 2, 0, 3, 3], fingers: [0, 2, 3, 0, 4, 1] },
  "D6add9/F#": { frets: [2, 0, 0, 2, 3, 0], fingers: [2, 0, 0, 1, 3, 0] },
  "Bm": { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1] },
  "F":  { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
  "Am": { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  "A":  { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  "B":  { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1] },
  "Cm": { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1] },
  "F#": { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1] },
  "F#m": { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1] }
};
