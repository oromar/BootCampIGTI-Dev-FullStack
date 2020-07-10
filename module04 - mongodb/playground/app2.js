var qty = gets()
 
while(qty !== 0) {
 const input = []
 
 for(let i =0; i < qty; i ++) {
   const s = gets().split(' ')
   input.push({name:s[0], value:s[1]})
 }

 let number = input[0].value
 let pos = 1
 while (input.length > 1) {
   const h = number % 2 === 0
   const n = input.length

   if (h)
     for (let i = 0; i < number; i++) current = input[((--pos % n) + n) % n]
   else
     for (let i = 0; i < number; i++) current = input[(pos + (i % n) + n) % n]

   number = current.value
   pos = input.indexOf(current)
   input.splice(pos, 1)
 }
 console.log(`Vencedor(a): ${input[0].name}`)
 qty = gets()
}