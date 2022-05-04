import imageio
import numpy as np
import scipy.io as scio
# import numpy as np
# from PIL import Image


a = scio.loadmat("QNet-Volumetric-Renderer\MATLABtest\Frame31_weights_v1.mat")
W1 = a["pw1"]
print(W1)
B1 = a["pb1"]
W2 = a["pw2"]
B2 = a["pb2"]
yrange = a["yrange"]

print(W1)
print(W2)
print(B1)
print(B2)
print(yrange)

np.save("W1.npy", W1)
np.save("B1.npy", B1)
np.save("W2.npy", W2)
np.save("B2.npy", B2)
np.save("yrange.npy", yrange)

# imageio.imwrite("W1.tiff", W1)
# imageio.imwrite("B1.tiff", B1)
# imageio.imwrite("W2.tiff", W2)
# imageio.imwrite("B2.tiff", B2)
# imageio.imwrite("yRange.tiff", yrange)

# img = Image.new( 'RGB', (50,10), "black") # Create a new black image
# pixels = img.load() # Create the pixel map
# for x in range(img.size[0]):    # For every pixel:
#     for y in range(img.size[1]):
#         temp = W1[x * img.size[1] + y]
#         pixels[x,y] = (temp[0], temp[1], temp[2]) # Set the colour accordingly

# img.show()