title = input("Title: ")
slug = input("Slug: ")

filename = "".join(word.capitalize() for word in slug.split("-")) + "Page"

print()
print("Title:", title)
print("Slug: /guides/" + slug)
print("Component:", filename)
print("File: src/pages/" + filename + ".js")
