class Main {
    public static void main(String[] args) {
        String str = "abacabcd";
        boolean[] seen = new boolean[256];
        System.out.print(calculFn(str, str.length()-1, seen, 0));
    }
 
    public static String calculFn(String str, int index, boolean[] seen, int i) {
        if(index < 0) return "";
        char c = str.charAt(index);
        String result = calculFn(str, index-1, seen, i + 1);
        System.out.println(result);
        if(!seen[c]) {
            seen[c] = true;
            return c + result;
        }
        return result;
    }
}