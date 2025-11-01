import json
import re
import os

supported_ext = (".mp4", ".avi", ".mov", ".mkv", ".webm")
video_files = [f for f in os.listdir() if f.lower().endswith(supported_ext)]

movie_list = []
for i in video_files:
    obj = dict()
    chunks = i.split(" ")
    ext = os.path.splitext(i)[1]
    obj['title1'] = " ".join(chunks[:5])
    obj['title2'] = "Season " + "".join(re.findall(r'\d', chunks[5])) + " - " + "Episode " + "".join(re.findall(r'\d', chunks[6]))
    obj['thumbnail'] = "shows/" + "_".join(chunks[:5]).lower()+"_"+ "_".join(chunks[5:7]).lower() + ".jpg"
    obj['filename'] = "shows/" + "_".join(chunks[:5]).lower()+"_"+ "_".join(chunks[5:7]).lower() +ext
    movie_list.append(obj)

with open("movie_list.json",'w') as f:
    f.write(json.dumps(movie_list,indent=4))