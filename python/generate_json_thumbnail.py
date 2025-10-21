import cv2
import os
import json
import numpy as np
import re

def clean_name(filename):
    """Remove special characters and spaces for clean renaming."""
    name = os.path.splitext(filename)[0]
    name = re.sub(r'[^a-zA-Z0-9_-]', '_', name)
    return name.strip('_')

def generate_best_thumbnail(video_path, output_folder):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"❌ Cannot open {video_path}")
        return None

    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if frame_count == 0:
        print(f"⚠️ No frames in {video_path}")
        return None

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
        score = brightness * 0.5 + sharpness * 0.5

        if score > best_score:
            best_score = score
            best_frame = frame

    cap.release()

    if best_frame is None:
        print(f"⚠️ No valid frame for {video_path}")
        return None

    os.makedirs(output_folder, exist_ok=True)
    return best_frame

movie = []
def process_folder(folder_path, output_folder="../public/"):
    supported_ext = (".mp4", ".avi", ".mov", ".mkv", ".webm")
    video_files = [f for f in os.listdir(folder_path) if f.lower().endswith(supported_ext)]

    for idx, filename in enumerate(sorted(video_files), start=1):
        old_path = os.path.join(folder_path, filename)
        ext = os.path.splitext(filename)[1]
        
        obj = dict()
        chunks = filename.split(" ")
        obj['title1'] = " ".join(chunks[:5])
        obj['title2'] = "Season " + "".join(re.findall(r'\d', chunks[5])) + " • " + "Episode " + "".join(re.findall(r'\d', chunks[6]))
        obj['thumbnail'] = "_".join(chunks[:5]).lower()+"_"+ "_".join(chunks[5:7]).lower() + ".jpg"
        obj['filename'] = "_".join(chunks[:5]).lower()+"_"+ "_".join(chunks[5:7]).lower() +ext

        new_name = obj['filename']

        new_path = os.path.join(folder_path, new_name)

        # Rename video
        os.rename(old_path, new_path)
        print(f"📁 Renamed: {filename} → {new_name}")

        # Generate thumbnail
        best_frame = generate_best_thumbnail(new_path, output_folder)
        if best_frame is not None:
            thumb_path = os.path.join(output_folder, obj['thumbnail'])
            cv2.imwrite(thumb_path, best_frame)
            print(f"✅ Thumbnail saved: {thumb_path}")

        movie.append(obj)


if __name__ == "__main__":
    folder = "../public/"  # 🔧 Change this to your folder name
    process_folder(folder)
    with open("../src/app/data/movie_data.json","w") as f:
        f.write(json.dumps(movie,indent=4))
