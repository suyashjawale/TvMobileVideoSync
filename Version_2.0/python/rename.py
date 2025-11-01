import os
supported_ext = (".mp4", ".avi", ".mov", ".mkv", ".webm")
video_files = [f for f in os.listdir() if f.lower().endswith(supported_ext)]
for filename in video_files:
    chunks = filename.split(" ")
    ext = os.path.splitext(filename)[1]
    newFile = "_".join(chunks[:5]).lower()+"_"+ "_".join(chunks[5:7]).lower() + ext
    os.rename(filename, newFile)