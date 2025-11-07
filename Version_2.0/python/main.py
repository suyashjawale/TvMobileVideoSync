import os

files = [i.split(".")[0] for i in os.listdir() if i.endswith("jpg")]

for i in files:
    fname = i.split("_")
    os.rename(f"{i}.mkv",f"{'_'.join(fname[:5])}-{'_'.join(fname[5:])}-{'_'.join(fname[5:])}.mkv")
    os.rename(f"{i}.jpg",f"{'_'.join(fname[5:])}.jpg")