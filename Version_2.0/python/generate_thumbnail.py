import cv2
import os
import numpy as np

if __name__ == "__main__":
    supported_ext = (".mp4", ".avi", ".mov", ".mkv", ".webm")
    video_files = [f for f in os.listdir() if f.lower().endswith(supported_ext)]

    for video_path in video_files:
        print(f"🎬 Processing: {video_path}")
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"❌ Cannot open {video_path}")
            continue

        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if frame_count == 0:
            print(f"⚠️ No frames in {video_path}")
            cap.release()
            continue

        # Sample 10 evenly spaced frames
        sample_frames = np.linspace(0, frame_count - 1, 10, dtype=int)
        best_score = -1
        best_frame = None

        for f in sample_frames:
            cap.set(cv2.CAP_PROP_POS_FRAMES, f)
            ret, frame = cap.read()
            if not ret or frame is None:
                continue

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            brightness = np.mean(gray)
            sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()

            # Weighted score (tweak weights if needed)
            score = brightness * 0.5 + sharpness * 0.5

            if score > best_score:
                best_score = score
                best_frame = frame

        cap.release()

        if best_frame is not None:
            out_name = os.path.splitext(video_path)[0] + ".jpg"
            cv2.imwrite(out_name, best_frame)
            print(f"✅ Saved thumbnail: {out_name}")
        else:
            print(f"⚠️ No valid frame found for {video_path}")
